import React from "react";
import { Navigate } from "react-router-dom";
import Logo from "../../components/Logo/logo";
import { init } from "@instantdb/react";


const APP_ID = "9d549577-d0af-4e6b-835a-70a6e518a5c2";

const db = init({ appId: APP_ID });

  const url = db.auth.createAuthorizationURL({
    // Use the GitHub client name from the Instant dashboard auth tab
    clientName: 'Ov23lilqY554BilxdwOh',
    redirectURL: window.location.href,
  });
function UserInfo() {
  const user = db.useUser();
  console.log(user);
  return <h1>Hello {user.email}!</h1>;
}

const Login = () => {
  const [nonce] = React.useState(crypto.randomUUID());

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-[85%] md:w-[28%] shadow-xl rounded-sm box p-10">
        <Logo />
        <db.SignedOut>
          <div className="my-5">
            <div>
              <a href={url}>Log in with Github</a>
            </div>
          </div>
        </db.SignedOut>
      </div>
    </div>
  );
};

export default Login;




