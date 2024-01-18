import EmailVerification from "@/components/common/EmailVerification";
import DefaultNavBar from "@/components/common/navbar/DefaultNavBar";
import { homeNavItems } from "@/constants/navbar/links";


const EmailVerify = ({ searchParams }: {
  params?: any
  searchParams?: any
}) => {
  const { email, action } = searchParams;

  //mutation
  return (
    <div className="max-width">
      <DefaultNavBar linkItems={homeNavItems} className="w-full" />
      <div className=" h-[80vh] flex justify-center flex-col items-center">
        <div className="w-[100%] md:w-[60%] lg:w-[40%] border border-gray-300 p-5 md:p-10 rounded-md">
          <EmailVerification
            email={email}
            purpose={action}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailVerify;
