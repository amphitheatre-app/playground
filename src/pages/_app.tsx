import "@/styles/globals.css"; // 导入全局样式
import Layout from "@/components/Layout";
import { Toaster } from "react-hot-toast";

function App({
  Component,
  pageProps,
}: Readonly<{ Component: any; pageProps: any }>) {
  return (
    <Layout>
      <Toaster />
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
