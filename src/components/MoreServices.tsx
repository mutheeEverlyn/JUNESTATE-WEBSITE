import Footer from "./Footer"
import NavBar from "./NavBar";
const serviceData = [
    {
      name: " Full Insurance",
      description: " Enjoy yours stay worry-free with our full insurance coverage. Every rental houses comes with comprehensive insurance, protecting you against unforeseen incidents and ensuring a hassle-free journey. We prioritize your safety and peace of mind at all times."
    },
    {
      name: " AT/MT Transactions",
      description: " Easily manage AT/MT transactions with our advanced system, offering flexible payment options for our houses. This ensures a hassle free experience, providing convenience and efficiency for every customer, every time.",
    },
    {
      name: "24-Hour Support",
      description: "Experience peace of mind with our 24-hour support service. Our dedicated team is always available to assist with any inquiries, technical issues, or emergencies, ensuring you receive help anytime, whenever you need it.",
    },
    {
     name: "Outstanding Services",
    description: " Our rental house management system excels in delivering outstanding services, ensuring a seamless booking experience, prompt house booking, and exceptional customer satisfaction. We go above and beyond to meet all your needs and exceed expectations.",
      },
      {
     name: "offers to our customers",
     description: "Book a house with us and stand a chance to win amaizing prices such as discounts and other more offers waiting for you .",
      },
  ];
const MoreServices = () => {
  return (
    <div>
      <NavBar/>
    <div className=" py-14 sm:min-h-[600px] sm:grid sm:place-items-center services" >
    <div className="container">
      <div className="pb-12">
        <h1
          className="text-3xl font-semibold text-center sm:text-4xl font-serif text-white"
        >
          Why Choose Us
        </h1>
      </div>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {serviceData.map((service) => (
          <div
            key={service.name}
            className=" bg-blue-400 card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark  hover:bg-primary duration-300 text-white hover:text-black rounded-lg"
          >
            <h1 className="text-2xl font-bold">{service.name}</h1>
            <p>{service.description}</p>
           
          </div>
        ))}
      </div>
    </div>
    <Footer/>
  </div>
  </div>
  )
}

export default MoreServices
