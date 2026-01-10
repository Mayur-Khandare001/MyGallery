import React from "react";
import { Navigate } from "react-router-dom";
import Logo from "../../components/Logo/logo";
import { init } from "@instantdb/react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

const APP_ID = "9d549577-d0af-4e6b-835a-70a6e518a5c2";

const db = init({ appId: APP_ID });

// e.g. 89602129-cuf0j.apps.googleusercontent.com
const GOOGLE_CLIENT_ID =
  "577497392128-g3aji5neetqgu4q7hquuk4l72jlei0j9.apps.googleusercontent.com";

// Use the google client name in the Instant dashboard auth tab
const GOOGLE_CLIENT_NAME = "google-web";
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
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
              <GoogleLogin
                nonce={nonce}
                onError={() => alert("Login failed")}
                onSuccess={({ credential }) => {
                  db.auth
                    .signInWithIdToken({
                      clientName: GOOGLE_CLIENT_NAME,
                      idToken: credential,
                      // Make sure this is the same nonce you passed as a prop
                      // to the GoogleLogin button
                      nonce,
                    })
                    .catch((err) => {
                      alert("Uh oh: " + err.body?.message);
                    });
                  //db.transact(db.tx.$users[user.id]);
                }}
              />
            </GoogleOAuthProvider>
          </div>
        </db.SignedOut>
      </div>
    </div>
  );
};

export default Login;






