"use client";

import Layout3d from "@/components/3d/Layout3d";
import HtmlComponent from "@/components/HtmlComponent";
import Layout from "@/components/Layout";

export default function ScrollRig() {
  return (
    <Layout>
      <Layout3d>
        <HtmlComponent />
      </Layout3d>
    </Layout>
  );
}
