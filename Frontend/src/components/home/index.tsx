import { homeNavItems } from "@/constants/navbar/links";
import DefaultNavBar from "../common/navbar/DefaultNavBar";
import "./index.css";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Login from "../auth/Login";
import { UserRoleEnum } from "@/constants/enum";
import Register from "../auth/Register";
import Footer from "../common/navbar/Footer";
const HomePage = () => {
  return (
    <>
      <div className="flex flex-col overflow-hidden">
        <div
          className='home-wrapper'
        >
          <DefaultNavBar linkItems={homeNavItems} />
          <div className="text-white justify-center max-width flex flex-col h-[100%] gap-8">
            <div className="absolute flex flex-col justify-center md:w-[40%] space-y-5 mx-auto animate-fade-up animate-once">
              <p className="text-5xl font-bold gradient-text bg-clip-text">
                Chat any time, with anyone and anywhere
              </p>
              <p className="text-white text-xl">
                ChatTak makes it easy and fun to connect and communicate with your favourite person.
              </p>

              <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2 bg-transparent text-white">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>
                <div className="h-[250px] overflow-auto">
                  <TabsContent value="login">
                    <Login />
                  </TabsContent>
                  <TabsContent value="register">
                    <Register role={UserRoleEnum.ADMIN} />
                  </TabsContent>
                </div>
              </Tabs>

              <Footer/>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
