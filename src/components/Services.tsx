import { Link } from "react-router-dom";
import { FaCameraRetro } from "react-icons/fa";
import { GiNotebook } from "react-icons/gi";
import { SlNote } from "react-icons/sl";

const serviceData = [
  {
    name: "Best Price",
    icon: (
      <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />
    
    ),
    link: "#",
    description: "Rent your dream house at an affordable price today"
  },
  {
    name: "Nature inspired exteriors",
    icon: (
      
      <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />
    ),
    link: "#",
    description: "We have a variety of houses with are nature inspired ,clean and ready waiting for you to move in",
  },
  {
    name: "Modern designed rooms",
    icon: (
        
      <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />
    ),
    link: "#",
    description: "Our houses are designed by the best using modern tools that emerge everyday",
  }
];
const Services = () => {
  return (
    <>
      <div className=" py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              Why Choose Us
            </h1>
          </div>
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {serviceData.map((service) => (
              <div
                key={service.name}
                className=" bg-blue-400 card text-center group space-y-3 sm:space-y-6 p-4 sm:py-16 bg-dark  hover:bg-amber-400 duration-300 text-white hover:text-black rounded-lg"
              >
                <div className="grid place-items-center">{service.icon}</div>
                <h1 className="text-2xl font-bold">{service.name}</h1>
                <p>{service.description}</p>
                <a
                  href={service.link}
                  className="inline-block text-lg font-semibold py-3 bg-blue-200 text-primary group-hover:text-black duration-300"
                >
                  <Link to='/more-services'>Learn more</Link>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
