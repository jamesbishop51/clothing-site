import { type AppType } from "next/app";
import { cartStore } from "~/store/cartStore";
import { api } from "~/utils/api";
import { Provider } from 'react-redux';

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={cartStore}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default api.withTRPC(MyApp);
