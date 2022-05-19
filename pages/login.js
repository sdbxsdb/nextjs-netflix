import Head from "next/head";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import { magic } from "../lib/magic-client";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showEmailError, setShowEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleOnChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    setShowEmailError("");
    // console.log({ email });
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (email.length > 3 && email.includes("@" && ".")) {
      if (email) {
        // log in a user by their email
        try {
          const DiDToken = await magic.auth.loginWithMagicLink({ email });
          console.log({ DiDToken });
          if (DiDToken) {
            // route to dashboard
            router.push("/");
          }
        } catch (error) {
          setIsLoading(false);
          console.error("error logging in", error);
        }
        setIsLoading(false);
        setShowEmailError("");
        console.log("EMAIL IS VALID and in DB - Route to dashboard");
      } else {
        setIsLoading(false);
        setShowEmailError("Email not found");
      }
    } else {
      // show email error message
      setIsLoading(false);
      console.log("EMAIL IS INVALID");
      setShowEmailError("Email address is invalid");
    }
  };

  return (
    <>
      <Head>
        <title>Netflix | Sign In</title>
      </Head>

      <header className="absolute top-0 w-full h-52 p-8 bg-gradient-to-b from-black">
        <div className="w-32 left-10">
          <Image
            src={"/static/netflixLogo.svg"}
            alt="Netflix logo"
            width="300px"
            height="100%"
          />
        </div>
      </header>

      <main
        style={{
          backgroundImage:
            "linear-gradient(rgba(000, 000, 000, 0.5), rgba(000, 00, 000, 0.5)),url('/static/netflix.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
        }}
        className="h-screen w-screen flex justify-center items-center"
      >
        <div className="p-12 bg-black bg-opacity-70 rounded flex flex-col">
          
              <h1 className="text-3xl mb-8">Sign In | Register</h1>
              <div className="flex flex-col items-center">
              
              {!isLoading && (
                <input
                  type="text"
                  className="p-2 rounded text-black mb-2"
                  placeholder="Email Address"
                  onChange={handleOnChangeEmail}
                />
                )}

                <small className="text-red20 mb-2">{showEmailError}</small>
              </div>
          
          <motion.button
            onClick={handleLoginWithEmail}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.0 }}
            className="bg-red20 rounded p-2"
          >
            {isLoading ? "Loading..." : "Lets Go!"}
          </motion.button>
        </div>
      </main>
    </>
  );
};

export default Login;
