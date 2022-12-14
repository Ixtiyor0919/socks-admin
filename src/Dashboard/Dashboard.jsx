import { useEffect, useState } from "react";
import instance from "../Api/Axios";
import { Grid, Container } from "@mui/material";
import AppCurrentVisits from "../App/AppCurrentVisits";
import AppCurrencySummary from "../Components/AppCurrencySummary";
import { message } from "antd";
import AppConversionRates from "../App/AppConversionRates";
import { useNavigate } from "react-router-dom";
import CustomTable from "../Module/Table/Table";

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [currency, setCurrency] = useState([]);
    const [incomeDryFruits, setIncomeDryFruits] = useState([]);
    const navigate = useNavigate();

    const getIncomeDryFruits = () => {
        setLoading(true);
        instance
            .get(`api/socks/factory/notification/statistics`)
            .then((data) => {
                setIncomeDryFruits(data.data?.data);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan materiallarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Material nomi",
            dataIndex: "name",
            key: "name",
            width: "20%",
            search: true,
            sorter: (a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Miqdori",
            dataIndex: "amount",
            key: "amount",
            width: "20%",
            sorter: (a, b) => {
                if (a.amount < b.amount) {
                    return -1;
                }
                if (a.amount > b.amount) {
                    return 1;
                }
                return 0;
            },
            search: false,
        },
        {
            title: "O'lchov birligi",
            dataIndex: "measurementName",
            key: "measurementName",
            width: "20%",
            sorter: (a, b) => {
                if (a.measurementId < b.measurementId) {
                    return -1;
                }
                if (a.measurementId > b.measurementId) {
                    return 1;
                }
                return 0;
            },
            search: false,
        },
        {
            title: "Material categoriyasi",
            dataIndex: "categoryName",
            key: "categoryName",
            width: "20%",
            search: true,
            sorter: (a, b) => {
                if (a.categoryName < b.categoryName) {
                    return -1;
                }
                if (a.categoryName > b.categoryName) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Mahsulot summasi",
            dataIndex: "totalSumma",
            key: "totalSumma",
            width: "20%",
            sorter: (a, b) => {
                if (a.amount < b.amount) {
                    return -1;
                }
                if (a.amount > b.amount) {
                    return 1;
                }
                return 0;
            },
            search: false,
        },
    ];

    const getCurrency = () => {
        instance
            .get(`api/socks/factory/api/socks/factory/currency`)
            .then((data) => {
                setCurrency(data.data.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    useEffect(() => {
        getCurrency();
    }, []);

    return (
        <Container className="content-container">
            <Grid className="grid-container" container spacing={3}>
                <Grid
                    className="currency"
                    sx={{ marginBottom: "10px" }}
                    xs={12}
                    sm={6}
                    md={3}
                    item
                    key={"dollar"}
                >
                    <AppCurrencySummary
                        title={currency?.ccyNmUZ}
                        currency={currency?.rate}
                        color="primary"
                        icon={"ant-design:dollar-circle-filled"}
                    />
                </Grid>
            </Grid>
            <Grid sx={{ gap: "20px" }} className="grid-container" spacing={2}>
                <Grid
                    className="grid1"
                    sx={{ width: "70%" }}
                    item
                    xs={12}
                    md={6}
                    lg={3}
                >
                    <AppConversionRates title="Sotilgan mahsulotlar hisoboti" />
                </Grid>
                <Grid
                    className="grid1 grid2"
                    sx={{ width: "30%" }}
                    item
                    xs={12}
                    md={6}
                    lg={3}
                >
                    <AppCurrentVisits title="Materiallar hisoboti" />
                </Grid>
            </Grid>
            {/* <CustomTable
                getData={getIncomeDryFruits}
                columns={columns}
                tableData={incomeDryFruits}
                loading={loading}
                setLoading={setLoading}
            /> */}
        </Container>
    );
};

export default Dashboard;
