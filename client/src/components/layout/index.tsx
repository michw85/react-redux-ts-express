import React from "react";
import { Layout as AntLayout } from "antd/dist/antd";
import { Button, DatePicker } from "antd/dist/antd";
import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
};

// const Layout: React.FC<Props> = ({ children }) => {
const Layout = ({ children }: Props) => {
  return (
    <>
      <div className={styles.main}>
        <AntLayout.Content
          style={{ height: "100%", margin: "10px 20px 30px 0", color: "white" }}
        >
          {children}
        </AntLayout.Content>
        {/* <Button type="primary">PRESS ME</Button> */}
      </div>
    </>
  );
};

export default Layout;
