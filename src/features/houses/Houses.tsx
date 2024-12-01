import React, { useState, useEffect } from "react";
import { useGetHouseQuery, useCreateHouseMutation, useUpdateHouseMutation, useDeleteHouseMutation, THouse } from "./HouseApi";
import { Toaster, toast } from 'sonner';

const Houses: React.FC = () => {
  const { data: house, isLoading, isError } = useGetHouseQuery();
  const [createHouse] = useCreateHouseMutation();
  const [updateHouse] = useUpdateHouseMutation();
  const [deleteHouse] = useDeleteHouseMutation();
  
  // Form state
  const [availability, setAvailability] = useState('');
  const [year_built, setYear_built] = useState<number | string>('');
  const [bedrooms, setBedrooms] = useState<number | string>('');
  const [rooms, setRooms] = useState<number | string>('');
  const [color, setColor] = useState('');
  const [rental_rate, setRental_rate] = useState<number | string>('');
  const [features, setFeatures] = useState('');
  const [images, setImages] = useState<string>('');
  
  // Edit state
  const [editHouseId, seteditHouseId] = useState<number | null>(null);
  
  useEffect(() => {
    if (editHouseId !== null && house) {
      const houseToEdit = house?.find((house: THouse) => house.house_id === editHouseId);
      if (houseToEdit) {
        setAvailability(houseToEdit.availability);
        setYear_built(houseToEdit.specification.year_built);
        setBedrooms(houseToEdit.specification.bedrooms);
        setRooms(houseToEdit.specification.rooms);
        setColor(houseToEdit.specification.color);
        setRental_rate(houseToEdit.rental_rate);
        setFeatures(houseToEdit.specification.features);
        setImages(houseToEdit.images);
      }
    }
  }, [editHouseId, house]);

  const handlecreateHouse = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newHouse = {
      availability,
      bedrooms,
      rooms,
      year_built: parseInt(year_built.toString(), 10),
      color,
      rental_rate: parseFloat(rental_rate.toString()),
      features,
      images, // Use image URL directly
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  
    try {
      await createHouse(newHouse).unwrap(); // Removed the 'result' variable
      toast.success('House added successfully');
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to add house: ${error.data.message}`);
      } else {
        toast.error('Failed to add house');
      }
    }
  };
  

  const handleEdiTHouse = (house: THouse) => {
    seteditHouseId(house.house_id);
    setAvailability(house.availability);
    setRooms(house.specification.rooms);
    setBedrooms(house.specification.bedrooms);
    setYear_built(house.specification.year_built);
    setColor(house.specification.color);
    setRental_rate(house.rental_rate);
    setFeatures(house.specification.features);
    setImages(house.images); // Set image URL
  };

  const handleUpdateHouse = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (editHouseId === null) {
      toast.error('No house selected for update');
      return;
    }
  
    const updatedHouse = {
      availability,
      rooms,
      bedrooms,
      year_built: parseInt(year_built.toString(), 10),
      color,
      rental_rate: parseFloat(rental_rate.toString()),
      features,
      images,
      updated_at: new Date().toISOString(),
    };
  
    try {
      await updateHouse({ house_id: editHouseId, ...updatedHouse }).unwrap();
      toast.success('House updated successfully');
      seteditHouseId(null);
      // Reset form fields
      resetForm();
    } catch (error: any) {
      if (error.data) {
        toast.error(`Failed to update house: ${error.data.message || 'Unknown error'}`);
      } else {
        toast.error('Failed to update house');
      }
    }
  };

  const handleDeleteHouse = async (id: number) => {
    try {
      await deleteHouse(id).unwrap();
      toast.success('house deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete house');
    }
  };

  const resetForm = () => {
    setAvailability('');
    setBedrooms('');
    setRooms('');
    setYear_built('');
    setColor('');
    setRental_rate('');
    setFeatures('');
    setImages('');
  };

  return (
    <>
      <Toaster
        toastOptions={{
          classNames: {
            error: 'bg-red-400',
            success: 'text-green-400',
            warning: 'text-yellow-400',
            info: 'bg-blue-400',
          },
        }}
      />
      <div className="p-4">
        <h1 className="text-xl my-4">{editHouseId ? 'Edit house' : 'Add New house'}</h1>
        <form onSubmit={editHouseId ? handleUpdateHouse : handlecreateHouse} className="mb-4">
          <div className="mb-2">
            <label htmlFor="availability" className="block">Availability:</label>
            <select
              id="availability"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            >
              <option value="">Select Availability</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
          <div className="mb-2">
            <label htmlFor="rooms" className="block">Rooms:</label>
            <input
              id="rooms"
              type="number"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="bedrooms" className="block">bedrooms:</label>
            <input
              id="bedrooms"
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="year_built" className="block">Year_built:</label>
            <input
              id="year_built"
              type="number"
              value={year_built}
              onChange={(e) => setYear_built(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="color" className="block">Color:</label>
            <input
              id="color"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="rental_rate" className="block">Rental Rate:</label>
            <input
              id="rental_rate"
              type="number"
              step="0.01"
              value={rental_rate}
              onChange={(e) => setRental_rate(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="features" className="block">Features:</label>
            <input
              id="features"
              type="text"
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="images" className="block">Images (URL):</label>
            <input
              id="images"
              type="text"
              value={images}
              onChange={(e) => setImages(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {editHouseId ? 'Update House' : 'Add House'}
          </button>
        </form>

        {isLoading && <p>Loading house...</p>}
        {isError && <p>Error loading house.</p>}
        
        <table className="w-full bg-gray-800 text-white border border-gray-700">
          <thead>
            <tr>
              <th className="p-2 border-b">ID</th>
              <th className="p-2 border-b">rooms</th>
              <th className="p-2 border-b">bedrooms</th>
              <th className="p-2 border-b">Year_built</th>
              <th className="p-2 border-b">Availability</th>
              <th className="p-2 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {house && house.map((house: THouse) => (
              <tr key={house.house_id}>
                <td className="p-2 border-b">{house.house_id}</td>
                <td className="p-2 border-b">{house.specification.rooms}</td>
                <td className="p-2 border-b">{house.specification.bedrooms}</td>
                <td className="p-2 border-b">{house.specification.year_built}</td>
                <td className="p-2 border-b">{house.availability}</td>
                <td className="p-2 border-b">
                  <button
                    onClick={() => handleEdiTHouse(house)}
                    className="btn btn-sm btn-outline btn-info mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteHouse(house.house_id)}
                    className="btn btn-sm btn-outline btn-warning"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Houses;
