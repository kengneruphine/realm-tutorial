import * as React from "react";
import * as RealmWeb from "realm-web";

const REALM_APP_ID = "task-tracker-tutorial-keknc";
const app = new RealmWeb.App({ id: REALM_APP_ID });

const RealmAppContext = React.createContext<IRealmApp | void>(undefined);

interface IRealmApp {
  id: string;
  user: Realm.User | null;
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  registerUser(email: string, password: string): Promise<void>;
}

const RealmApp: React.FC = ({ children }) => {
  // Keep track of the current user in local state
  const appRef = React.useRef(app);
  const [user, setUser] = React.useState(app.currentUser);
  React.useEffect(() => {
    setUser(app.currentUser);
  }, [appRef.current.currentUser]);

  // Let new users register an account
  const registerUser = async (email: string, password: string) => {
    // TODO: Register a new user with the specified email and password
    
  };

  // Let registered users log in
  const logIn = async (email: string, password: string) => {
    // TODO: Log in with the specified email and password
    
    setUser(app.currentUser);
  };

  // Let logged in users log out
  const logOut = async () => {
    // TODO: Log the current user out
    
    setUser(app.currentUser);
  };

  // Provide the current user and authentication methods to the wrapped tree
  const context: IRealmApp = {
    id: REALM_APP_ID,
    user,
    logIn,
    logOut,
    registerUser,
  };
  return (
    <RealmAppContext.Provider value={context}>
      {children}
    </RealmAppContext.Provider>
  );
};
export default RealmApp;

export const useRealmApp = (): IRealmApp => {
  const app = React.useContext(RealmAppContext);
  if (!app) {
    throw new Error("You must call useRealmApp() inside of a <RealmApp />.");
  }
  return app;
};
