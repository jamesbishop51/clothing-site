import { type AppType } from "next/app";
import { cartStore } from "~/store/cartStore";
import { api } from "~/utils/api";
import { Provider } from 'react-redux';
import Header from "~/components/header";
import Footer from "~/components/footer";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Provider store={cartStore}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Provider>
  );
};

export default api.withTRPC(MyApp);
