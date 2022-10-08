import { useState } from "react";
import instance from "../Api/Axios";
import moment from "moment";
import { message } from "antd";
import CustomTable from "../Module/Table/Table";
import { useNavigate } from "react-router-dom";
import { useData } from "../Hook/UseData";

const IncomeSocks = () => {
    const [outcomeFuel, setOutcomeFuel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItems, setTotalItems] = useState(0);
    const { measurementData, createMaterialData } = useData();
    const navigate = useNavigate();

    const getOutcomeDryFruits = (current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/incomeMaterial/getAllPageable?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel = data.data?.data?.dryFruit.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("DD-MM-YYYY"),
                    };
                });
                setOutcomeFuel(fuel);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const getOutcomeFruitTimely = (value, current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/incomeMaterial/getAllPageable/${value}?page=${current}&size=${pageSize}`
            )
            .then((data) => {
                const fuel = data.data?.data?.dryFruit?.map((item) => {
                    return {
                        ...item,
                        date: moment(item?.date).format("DD-MM-YYYY"),
                    };
                });
                setOutcomeFuel(fuel);
                setTotalItems(data.data?.data?.totalItems);
            })
            .catch((error) => {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const dateFilter = (date, current, pageSize) => {
        setLoading(true);
        instance
            .get(
                `api/socks/factory/incomeMaterial/getAllPageable/dates?page=${current}&size=${pageSize}&startDate=${moment(
                    date[0]
                ).format("YYYY-MM-DD HH:MM:SS")}&endDate=${moment(
                    date[1]
                ).format("YYYY-MM-DD HH:MM:SS")}`
            )
            .then((data) => {
                const fuel = data.data.data.dryFruit.map((item) => {
                    return {
                        ...item,
                        date: moment(item.date).format("DD-MM-YYYY"),
                    };
                });
                setOutcomeFuel(fuel);
                setTotalItems(data.data.data.totalItems);
            })
            .catch((err) => {
                console.error(err);
                if (err.response?.status === 500) navigate("/server-error");
                message.error("Kelgan naskilarni yuklashda muammo bo'ldi");
            })
            .finally(() => setLoading(false));
    };

    const columns = [
        {
            title: "Material",
            dataIndex: "materialId",
            key: "materialId",
            width: "20%",
            search: false,
            render: (record) => {
                const data = createMaterialData?.filter(
                    (item) => item.id === record
                );
                return data[0]?.name;
            },
            sorter: (a, b) => {
                if (a.materialId < b.materialId) {
                    return -1;
                }
                if (a.materialId > b.materialId) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "O'lchovi",
            dataIndex: "measurementId",
            key: "measurementId",
            width: "20%",
            render: (record) => {
                const data = measurementData.filter(
                    (item) => item.id === record
                );
                return data[0]?.name;
            },
            search: false,
            sorter: (a, b) => {
                if (a.measurementId < b.measurementId) {
                    return -1;
                }
                if (a.measurementId > b.measurementId) {
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
            title: "Kelgan narxi",
            dataIndex: "price",
            key: "price",
            width: "20%",
            search: false,
            sorter: (a, b) => {
                if (a.price < b.price) {
                    return -1;
                }
                if (a.price > b.price) {
                    return 1;
                }
                return 0;
            },
        },
        {
            title: "Kelgan vaqti",
            dataIndex: "date",
            key: "date",
            width: "20%",
            search: false,
            sorter: (a, b) => {
                if (a.date < b.date) {
                    return -1;
                }
                if (a.date > b.date) {
                    return 1;
                }
                return 0;
            },
        },
    ];

    const onCreate = (values) => {
        setLoading(true);
        const value = {
            ...values,
            date: values.date.toISOString(),
        };
        instance
            .post("api/socks/factory/incomeMaterial/add", { ...value })
            .then(function (response) {
                message.success("Kelgan naski muvaffaqiyatli qo'shildi");
                getOutcomeDryFruits(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error(error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan naskini qo'shishda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const onEdit = (values, initial) => {
        setLoading(true);
        const time = moment(values.date, "DD-MM-YYYY").toISOString();
        const data = {
            ...values,
            date: time,
            deleted: false,
        };
        instance
            .put(`api/socks/factory/incomeMaterial/update${initial.id}`, {
                ...data,
            })
            .then((res) => {
                message.success("Kelgan naski muvaffaqiyatli taxrirlandi");
                getOutcomeDryFruits(current - 1, pageSize);
            })
            .catch(function (error) {
                console.error("Error in edit: ", error);
                if (error.response?.status === 500) navigate("/server-error");
                message.error("Kelgan naskini taxrirlashda muammo bo'ldi");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleDelete = (arr) => {
        setLoading(true);
        arr.map((item) => {
            instance
                .delete(`api/socks/factory/incomeMaterial/delete${item}`)
                .then((data) => {
                    getOutcomeDryFruits(current - 1, pageSize);
                    message.success("Kelgan naski muvaffaqiyatli o'chirildi");
                })
                .catch((error) => {
                    console.error(error);
                    if (error.response?.status === 500)
                        navigate("/server-error");
                    message.error("Kelgan naskini o'chirishda muammo bo'ldi");
                })
                .finally(() => setLoading(false));
            return null;
        });
    };

    const timelySelect = [
        { title: "Kunlik", value: "daily" },
        { title: "Haftalik", value: "weekly" },
        { title: "Oylik", value: "monthly" },
        { title: "Yillik", value: "yearly" },
    ];

    return (
        <>
            <CustomTable
                dateFilter={dateFilter}
                onEdit={onEdit}
                onCreate={onCreate}
                onDelete={handleDelete}
                getData={getOutcomeDryFruits}
                getDataTimely={getOutcomeFruitTimely}
                columns={columns}
                tableData={outcomeFuel}
                current={current}
                pageSize={pageSize}
                totalItems={totalItems}
                loading={loading}
                setLoading={setLoading}
                setCurrent={setCurrent}
                setPageSize={setPageSize}
                pageSizeOptions={[10, 20]}
                timelySelect={timelySelect}
            />
        </>
    );
};

export default IncomeSocks;
