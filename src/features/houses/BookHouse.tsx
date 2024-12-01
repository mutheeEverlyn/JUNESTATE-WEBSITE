import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetHouseQuery, THouse } from './HouseApi';
import { useCreateBookingsMutation, useGetBookingsQuery, TBookedHouses } from './BookingsApi';
import { useGetLocationQuery, Tlocation } from '../location/LocationApi';
import { Toaster, toast } from 'sonner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isSameDay } from 'date-fns';

const BookHouse = () => {
  const { data: Houses, error, isLoading } = useGetHouseQuery();
  const { data: locations, isLoading: isLocationsLoading, error: locationsError } = useGetLocationQuery();
  const { data: bookings, isLoading: isBookingsLoading, error: bookingsError } = useGetBookingsQuery();
  const [createBooking] = useCreateBookingsMutation();
  const navigate = useNavigate();
  const [selectedLocation_id, setSelectedLocation_id] = useState<number | null>(null);
  const [selectedHouse, setselectedHouse] = useState<THouse | null>(null);
  const [bookingDate, setBookingDate] = useState<Date | null>(null);
  const [returnDate, setReturnDate] = useState<Date | null>(null);

  const userDetailsString = localStorage.getItem('userDetails') || '{}';
  const userDetails = JSON.parse(userDetailsString);
  const user_id = userDetails?.user_id;

  const handleBook = async () => {
    if (!selectedLocation_id) {
      toast.error("Please select a location.");
      return;
    }

    if (!user_id) {
      toast.error("User not logged in.");
      return;
    }

    if (!selectedHouse || !selectedHouse.house_id || selectedHouse.availability === 'unavailable') {
      toast.error("Invalid or unavailable house selected.");
      return;
    }

    if (!bookingDate || !returnDate) {
      toast.error("Please select both booking and return dates.");
      return;
    }

    // Check for date overlaps
    const isOverlapping = bookings?.some((booking: TBookedHouses) =>
      booking.house_id === selectedHouse.house_id &&
      ((new Date(booking.booking_date) <= bookingDate && new Date(booking.ending_date) >= bookingDate) ||
        (new Date(booking.booking_date) <= returnDate && new Date(booking.ending_date) >= returnDate) ||
        (new Date(booking.booking_date) >= bookingDate && new Date(booking.ending_date) <= returnDate))
    );

    if (isOverlapping) {
      toast.error("Selected dates overlap with an existing booking for this house.");
      return;
    }

    const bookingDays = Math.ceil((returnDate.getTime() - bookingDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = bookingDays * selectedHouse.rental_rate;

    console.log('Booking details:', {
      user_id,
      house_id: selectedHouse.house_id,
      location_id: selectedLocation_id,
      booking_date: bookingDate.toISOString(),
      ending_date: returnDate.toISOString(),
      total_amount: totalAmount,
      booking_status: 'Pending'
    });

    try {
      const response = await createBooking({
        user_id,
        house_id: selectedHouse.house_id,
        location_id: selectedLocation_id,
        booking_date: bookingDate.toISOString(),
        ending_date: returnDate.toISOString(),
        total_amount: totalAmount,
        booking_status: 'Pending'
      });

      console.log('Booking response:', response);

      if (response?.data?.msg === 'bookings created successfully') {
        toast.success("House booked successfully!");
        navigate('/user-dashboard/bookings');
      } else {
        console.error('Error booking the house:', response?.error);
        toast.error("Failed to book the house.");
      }
    } catch (error) {
      console.error('Error booking the house:', error);
      toast.error("Failed to book the house.");
    }
  };

  const handleShowDetails = (house: THouse) => {
    console.log('Selected house:', house);  // Debugging
    if (house.availability === 'available') {
      setselectedHouse(house);
    } else {
      toast.error("This house is not available.");
    }
  };

  const handleCloseDetails = () => {
    setselectedHouse(null);
  };

  const isDateBooked = (date: Date) => {
    return bookings?.some((booking: TBookedHouses) =>
      selectedHouse?.house_id === booking.house_id &&
      (isSameDay(new Date(booking.booking_date), date) ||
      isSameDay(new Date(booking.ending_date), date))
    );
  };

  const dateClassName = (date: Date) => {
    return isDateBooked(date) ? 'bg-red-400 text-white' : '';
  };

  if (isLoading || isLocationsLoading || isBookingsLoading) return <p>Loading...</p>;
  if (error || locationsError || bookingsError) return <p>Error loading data.</p>;

  // Debugging logs
  console.log('Houses:', Houses);
  console.log('Selected house:', selectedHouse);

  return (
    <div className="pb-24">
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'bg-green-400',
          },
        }}
      />
      <div className="container">
        <h1 className="text-3xl sm:text-4xl font-semibold font-serif mb-3">
          Book a house to enjoy your stay
        </h1>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">Select Location</label>
          <select
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
            value={selectedLocation_id || ''}
            onChange={(e) => setSelectedLocation_id(Number(e.target.value))}
          >
            <option value="" disabled>Select a location</option>
            {locations?.map((location: Tlocation) => (
              <option key={location.location_id} value={location.location_id}>
                {location.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
          {Houses?.map((house: THouse) => (
            <div key={house.house_id} className="space-y-3 border-2 border-gray-300 hover:border-blue-400 p-3 rounded-xl relative group">
              <div className="w-full h-[120px]">
                <img src={house.images || "default-image-path"} alt={house.specification.features} className="w-full h-[120px] object-contain sm:translate-x-8 group-hover:sm:translate-x-16 duration-700"/>
              </div>
              <div className="space-y-2">
                <h1 className="text-primary font-semibold">{house.specification.rooms} {house.specification.rooms}</h1>
                <div className="flex justify-between items-center text-xl font-semibold">
                  <p>${house.rental_rate}/Day</p>
                  <button onClick={() => handleShowDetails(house)} className="text-blue-600 hover:underline focus:outline-none">
                    Details
                  </button>
                </div>
                {house.availability === 'unavailable' && <p className="text-red-500">Not Available</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedHouse && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 max-w-md rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">{selectedHouse.specification.features}{selectedHouse.specification.features}</h2>
            <p><strong>Rental Rate:</strong> ${selectedHouse.rental_rate}/Day</p>
            <p><strong>Rooms available:</strong> {selectedHouse.specification.rooms} Rooms</p>
            <p><strong>Color:</strong> {selectedHouse.specification.color}</p>
            <p><strong>Bedrooms:</strong> {selectedHouse.specification.bedrooms}</p>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Booking Date</label>
              <DatePicker
                selected={bookingDate}
                onChange={(date: Date | null) => setBookingDate(date)}
                dayClassName={(date: Date) => dateClassName(date)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Return Date</label>
              <DatePicker
                selected={returnDate}
                onChange={(date: Date | null) => setReturnDate(date)}
                dayClassName={(date: Date) => dateClassName(date)}
                className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button onClick={handleCloseDetails} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none">Cancel</button>
              <button onClick={handleBook} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookHouse;
