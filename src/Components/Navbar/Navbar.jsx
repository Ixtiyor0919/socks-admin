import { Avatar, Dropdown, Layout, Menu } from "antd";
import React, { useState } from "react";
import {
    DashboardOutlined,
    MenuOutlined,
    UserOutlined,
    LogoutOutlined,
    CloudUploadOutlined,
    CloudDownloadOutlined,
    DollarCircleOutlined,
    AppstoreAddOutlined,
    TeamOutlined,
    AppstoreOutlined,
    CloudServerOutlined,
    CloudSyncOutlined,
    BellOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import { useData } from "../../Hook/UseData";
import useToken from "../../Hook/UseToken";
import DrapdownMenu from "../DrapdownMenu/DrapdownMenu";
import socks2 from "./socks2.png";
import Notification from "../Notification/Notification";

const { Header } = Layout;

function Navbar() {
    const [isVisible, setIsVisible] = useState(false);
    const { user } = useData();
    const { token } = useToken();
    const location = useLocation();

    const handleLogOut = (e) => {
        e.preventDefault();
        if (sessionStorage.getItem("socks-token"))
            sessionStorage.removeItem("socks-token", token);
        if (localStorage.getItem("socks-token")) {
            localStorage.removeItem("socks-token", token);
        }
        window.location.href = "/login";
    };

    const showDrawer = () => {
        setIsVisible(true);
    };

    const onClose = () => {
        setIsVisible(false);
    };

    const menu = (
        <Menu
            items={[
                {
                    key: "/profil",
                    icon: <UserOutlined />,
                    label: (
                        <Link
                            to="/profil"
                            style={{ width: "100px", display: "inline-block" }}
                        >
                            Profil
                        </Link>
                    ),
                },
                user.roleId === 1
                    ? {
                          key: "/notification",
                          icon: <BellOutlined />,
                          label: (
                              <Link
                                  to="/notification"
                                  style={{
                                      width: "100px",
                                      display: "inline-block",
                                  }}
                              >
                                  Eslatmalar
                              </Link>
                          ),
                      }
                    : null,
                {
                    key: "3",
                    danger: true,
                    icon: <LogoutOutlined />,
                    label: (
                        <div
                            onClick={(e) => handleLogOut(e)}
                            style={{ width: "100px" }}
                        >
                            Chiqish
                        </div>
                    ),
                },
            ]}
        />
    );

    return (
        <Header
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 99,
            }}
        >
            <div
                className="container"
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="logo" style={{ marginRight: "5%" }}>
                    <Link to="/" style={{ marginTop: "3px", display: "block" }}>
                        <img
                            src={socks2}
                            alt="img-logo"
                            width={70}
                            height={40}
                        />
                    </Link>
                </div>
                {user.roleId === 1 ? (
                    <div className="notification">
                        <Notification />
                    </div>
                ) : null}
                <Menu
                    style={{ width: "75%" }}
                    className="inline-navber"
                    theme="dark"
                    defaultSelectedKeys={[location.pathname]}
                    mode="horizontal"
                    items={[
                        {
                            label: "Bosh Sahifa",
                            key: "/",
                            icon: (
                                <Link to="/">
                                    <DashboardOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Material",
                            key: "/material",
                            icon: (
                                <Link to="/material">
                                    <CloudSyncOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Kelgan Materiallar",
                            key: "/income-material",
                            icon: (
                                <Link to="/income-material">
                                    <CloudDownloadOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Ishlatilgan Materiallar",
                            key: "/outcome-material",
                            icon: (
                                <Link to="/outcome-material">
                                    <CloudSyncOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Naskilar",
                            key: "/socks",
                            icon: (
                                <Link to="/socks">
                                    <CloudServerOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Sotilgan Naskilar",
                            key: "/outcome",
                            icon: (
                                <Link to="/outcome">
                                    <CloudUploadOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                            children: [
                                {
                                    label: "Sotilgan Naskilar",
                                    key: "/outcome-socks",
                                    icon: (
                                        <Link to="/outcome-socks">
                                            <DollarCircleOutlined
                                                style={{ fontSize: "18px" }}
                                            />
                                        </Link>
                                    ),
                                },
                                {
                                    label: "Ko'proq sotish",
                                    key: "/outcome-nakladnoy",
                                    icon: (
                                        <Link to="/outcome-nakladnoy">
                                            <DollarCircleOutlined
                                                style={{ fontSize: "18px" }}
                                            />
                                        </Link>
                                    ),
                                },
                            ],
                        },
                        {
                            label: "Qarzlar",
                            key: "/debts",
                            icon: (
                                <Link to="/debts">
                                    <DollarCircleOutlined
                                        style={{ fontSize: "18px" }}
                                    />
                                </Link>
                            ),
                        },
                        {
                            label: "Qo'shimchalar",
                            key: "others",
                            icon: (
                                <AppstoreAddOutlined
                                    style={{ fontSize: "18px" }}
                                />
                            ),
                            children: [
                                {
                                    label: "Klientlar",
                                    key: "/clients",
                                    icon: (
                                        <Link to="/clients">
                                            <TeamOutlined
                                                style={{ fontSize: "18px" }}
                                            />
                                        </Link>
                                    ),
                                },
                                user.roleId === 1
                                    ? {
                                          label: "Foydalanuvchilar",
                                          key: "/users",
                                          icon: (
                                              <Link to="/users">
                                                  <UserOutlined
                                                      style={{
                                                          fontSize: "18px",
                                                      }}
                                                  />
                                              </Link>
                                          ),
                                      }
                                    : null,
                                {
                                    label: "Boshqalar",
                                    key: "/others",
                                    icon: (
                                        <Link to="/others">
                                            <AppstoreOutlined
                                                style={{ fontSize: "18px" }}
                                            />
                                        </Link>
                                    ),
                                },
                            ],
                        },
                    ]}
                />
                <span
                    className="user inline-navber"
                    style={{
                        marginLeft: "auto",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {user.roleId === 1 ? <Notification /> : null}
                    <Dropdown overlay={menu} placement="bottomRight" arrow>
                        <Avatar
                            size="middle"
                            style={{
                                color: "#f56a00",
                                backgroundColor: "#fde3cf",
                            }}
                        >
                            {user?.fio?.charAt(0)}
                        </Avatar>
                    </Dropdown>
                </span>
                <div className="burger-menu">
                    <span
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <MenuOutlined
                            onClick={showDrawer}
                            rotate={180}
                            style={{ fontSize: "28px", color: "#fff" }}
                        />
                        <DrapdownMenu onClose={onClose} isVisible={isVisible} />
                    </span>
                </div>
            </div>
        </Header>
    );
}

export default Navbar;
