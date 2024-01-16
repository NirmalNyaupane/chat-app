import { UserRoleEnum } from "@/constants/enum";
import { homeNavItems } from "@/constants/navbar/links";
import Login from "../auth/Login";
import Register from "../auth/Register";
import DefaultNavBar from "../common/navbar/DefaultNavBar";
import Footer from "../common/navbar/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

import "./index.css";
const HomePage = () => {
  return (
    <>
      <div className="max-width flex flex-col">
        <DefaultNavBar linkItems={homeNavItems} />
        <div className="flex h-[100%] mt-3">
          <div className="flex flex-col md:w-[30%] gap-10 animate-fade-up animate-once z-10 text-justify">
            <p className="text-3xl md:text-5xl font-bold gradient-text bg-clip-text font-sans">
              Chat any time, with anyone and anywhere
            </p>
            <p className="text-lg text-gray-600">
              ChatTak makes it easy and fun to connect and communicate with your favourite person.
            </p>

            <Tabs defaultValue="login" className="mx-2 w-full">
              <TabsList className="grid w-full grid-cols-2 bg-transparent">
                <TabsTrigger value="login" className="shadow-none text-black data-[state=active]:shadow-none border-green-500">Login</TabsTrigger>
                <TabsTrigger value="register" className="shadow-none text-black data-[state=active]:shadow-none border-green-500">Register</TabsTrigger>
              </TabsList>
              <div className="h-[300px] overflow-auto px-2">
                <TabsContent value="login">
                  <Login />
                </TabsContent>
                <TabsContent value="register">
                  <Register role={UserRoleEnum.ADMIN} />
                </TabsContent>
              </div>
            </Tabs>
          </div>


          <div className="text-white">
            ierwihrwiuh werueiw
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default HomePage;
