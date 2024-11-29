
import { Link } from "react-router-dom";
import house4 from "../assets/house4.jpg";

const About = () => {
  return (
    <div className=" bg-slate-100 sm:min-h-[600px] sm:grid sm:place-items-center duration-300 w-full max-w-full ">
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-center">
          <div  >
            <img
              src={house4}
              alt="house"
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)]"
            />
          </div>
          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <h1 className="text-3xl sm:text-4xl font-bold font-serif"> About us</h1>
              <p  className="leading-8 ">
                We are a company offer our customers a wide range of houses located all over our country with various rooms.
              </p>
              <p >
               We believe that everyone deserves to experience the pleasure of living in a luxurious environment at an affordable price.
              </p>
             <button className="bg-blue-400 p-2 rounded-md"><Link to='/'>Go back</Link></button> 
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
