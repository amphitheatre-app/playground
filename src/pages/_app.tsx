import "@/styles/globals.css"; // 导入全局样式
import Layout from "@/components/Layout";

function App({
  Component,
  pageProps,
}: Readonly<{ Component: any; pageProps: any }>) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default App;
