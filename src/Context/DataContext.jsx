import { DatePicker, Input, InputNumber, Radio } from "antd";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../Api/Axios";
import useToken from "../Hook/UseToken";
import CustomSelect from "../Module/Select/Select";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [usersdata, setUsersData] = useState({});
    const [user, setUser] = useState({});
    const [userLoading, setUserLoading] = useState(true);
    const [measurementData, setMeasurementData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [socksData, setSocksData] = useState([]);
    const [outcomeSocksIdData, setOutcomeSocksData] = useState([]);
    const [createMaterialData, setMaterialData] = useState([]);
    const [roleData, setRoleData] = useState([]);
    const [clientData, setClientData] = useState([]);
    const { token } = useToken();
    let location = useLocation();

    const incomeSocksData = [
        {
            name: "materialId",
            label: "Material nomi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Materialni tanlang"}
                    selectData={createMaterialData}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Kelish vaqti",
            input: (
                <DatePicker
                    style={{ width: "100%" }}
                    value={moment().format()}
                />
            ),
        },
    ];

    const editIncomeSocksData = [
        {
            name: "materialId",
            label: "Material nomi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Materialni tanlang"}
                    selectData={createMaterialData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Kelish vaqti",
            input: <Input />,
        },
    ];

    const outcomeSocksData = [
        {
            name: "socksId",
            label: "Naski nomi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naskini tanlang"}
                    selectData={socksData}
                />
            ),
        },
        {
            name: "clientId",
            label: "Klient ismi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "date",
            label: "Sotilish vaqti",
            input: (
                <DatePicker
                    style={{ width: "100%" }}
                    value={moment().format()}
                />
            ),
        },
        {
            name: "debt",
            label: "Qarzdorlik",
            input: (
                <Radio.Group>
                    <Radio value="false"> Yo'q </Radio>
                    <Radio value="true"> Bor </Radio>
                </Radio.Group>
            ),
        },
    ];

    const editOutcomeSocksData = [
        {
            name: "socksId",
            label: "Naski nomi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naskini tanlang"}
                    selectData={socksData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "clientId",
            label: "Klient ismi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "measurementId",
            label: "Naski o'lchovi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Naski o'lchovi"}
                    selectData={measurementData}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "date",
            label: "Sotilish vaqti",
            input: <Input />,
        },
        {
            name: "debt",
            label: "Qarzdorlik",
            inputSelect: (defaultId = null) => {
                const str = defaultId?.toString();
                return (
                    <Radio.Group defaultValue={str}>
                        <Radio value="false"> Yo'q </Radio>
                        <Radio value="true"> Ha </Radio>
                    </Radio.Group>
                );
            },
        },
    ];

    const othersData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
    ];

    const createSocksData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
        {
            name: "categoryId",
            label: "Kategoriyani tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Kategoriyani tanlang"}
                    selectData={categoryData}
                />
            ),
        },
        {
            name: "price",
            label: "Narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editsocksData = [
        {
            name: "name",
            label: "Nomi",
            input: <Input />,
        },
        {
            name: "categoryId",
            label: "Kategoriyani tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Kategoriyani tanlang"}
                    selectData={categoryData}
                />
            ),
        },
        {
            name: "amount",
            label: "Naski miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "price",
            label: "Narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const clientsData = [
        {
            name: "fio",
            label: "Klient FIO",
            input: <Input />,
        },
        {
            name: "phoneNumber",
            label: "Klient nomeri",
            input: <Input />,
        },
        {
            name: "address",
            label: "Klient addressi",
            input: <Input />,
        },
    ];

    const usersDataForm = [
        {
            name: "fio",
            label: "Ishchi FIO",
            input: <Input />,
        },
        {
            name: "phoneNumber",
            label: "Ishchi nomeri",
            input: <Input />,
        },
        {
            name: "password",
            label: "Ishchi passwordi",
            input: <Input />,
        },
        user?.roleId === 1
            ? {
                  name: "roleId",
                  label: "Role",
                  input: (
                      <CustomSelect
                          backValue={"id"}
                          placeholder={"Roleni tanlang"}
                          selectData={roleData?.filter(
                              (item) => item?.roleName !== "ROLE_ADMIN"
                          )}
                      />
                  ),
              }
            : {
                  name: "roleId",
                  label: "Role",
                  input: (
                      <CustomSelect
                          backValue={"id"}
                          placeholder={"Roleni tanlang"}
                          selectData={roleData?.filter(
                              (item) => item?.roleName === "ROLE_EMPLOYEE"
                          )}
                      />
                  ),
              },
        {
            name: "block",
            label: "block",
            input: (
                <Radio.Group>
                    <Radio value="false"> Yo'q </Radio>
                    <Radio value="true"> Ha </Radio>
                </Radio.Group>
            ),
        },
    ];

    const editUsersDataForm = [
        {
            name: "fio",
            label: "Ishchi FIO",
            input: <Input />,
        },
        {
            name: "phoneNumber",
            label: "Ishchi nomeri",
            input: <Input />,
        },
        {
            name: "password",
            label: "Ishchi passwordi",
            input: <Input />,
        },
        user?.roleId === 1
            ? {
                  name: "roleId",
                  label: "Role",
                  inputSelect: (initial) => (
                      <CustomSelect
                          backValue={"id"}
                          placeholder={"Roleni tanlang"}
                          selectData={roleData?.filter(
                              (item) => item?.roleName !== "ROLE_ADMIN"
                          )}
                          DValue={initial}
                      />
                  ),
              }
            : {
                  name: "roleId",
                  label: "Role",
                  inputSelect: (initial) => (
                      <CustomSelect
                          backValue={"id"}
                          placeholder={"Roleni tanlang"}
                          //   selectData={roleData}
                          DValue={initial}
                          selectData={roleData?.map((item) => ({
                              ...item,
                              name: item.roleName,
                          }))}
                          disabled={true}
                      />
                  ),
              },
        user?.roleId === 1
            ? {
                  name: "block",
                  label: "Bloklanganligi",
                  input: (
                      <Radio.Group>
                          <Radio value="false"> Yo'q </Radio>
                          <Radio value="true"> Ha </Radio>
                      </Radio.Group>
                  ),
              }
            : {
                  name: "block",
                  label: "Bloklanganligi",
                  input: (
                      <Radio.Group disabled>
                          <Radio value="false"> Yo'q </Radio>
                          <Radio value="true"> Ha </Radio>
                      </Radio.Group>
                  ),
              },
    ];

    const materialData = [
        {
            name: "name",
            label: "Material nomi",
            input: <Input />,
        },
        {
            name: "measurementId",
            label: "O'lchovini tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"O'lchovini tanlang"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Material miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const editmaterialData = [
        {
            name: "name",
            label: "Material nomi",
            input: <Input />,
        },
        {
            name: "measurementId",
            label: "O'lchovini tanlang",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"O'lchovini tanlang"}
                    selectData={measurementData}
                />
            ),
        },
        {
            name: "amount",
            label: "Material miqdori",
            input: <InputNumber style={{ width: "100%" }} />,
        },
    ];

    const outdebtFormData = [
        {
            name: "clientId",
            label: "Klient ismi",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                />
            ),
        },
        {
            name: "outcomeSocksId",
            label: "Qarzga olingan mahsulot",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Mahsulkotni tanlang"}
                    selectData={socksData}
                />
            ),
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "deadline",
            label: "Topshirish muddati",
            input: (
                <DatePicker
                    style={{ width: "100%" }}
                    value={moment().format()}
                />
            ),
        },
    ];

    const editOutdebtFormData = [
        {
            name: "clientId",
            label: "Klient ismi",
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Klientni tanlang"}
                    selectData={clientData?.map((item) => ({
                        ...item,
                        name: item.fio,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "outcomeSocksId",
            label: "Qarzga olingan mahsulot",
            input: (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Sotilgan mahsulot tanlang"}
                    selectData={socksData}
                />
            ),
            inputSelect: (defaultId = null) => (
                <CustomSelect
                    backValue={"id"}
                    placeholder={"Sotilgan mahsulot tanlang"}
                    selectData={socksData?.map((item) => ({
                        ...item,
                        name: item.name,
                    }))}
                    DValue={defaultId}
                />
            ),
        },
        {
            name: "price",
            label: "Naski narxi",
            input: <InputNumber style={{ width: "100%" }} />,
        },
        {
            name: "deadline",
            label: "Topshirish muddati",
            input: <Input />,
        },
    ];

    const getUserData = (token) => {
        instance
            .get("api/socks/factory/user/current", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((data) => {
                setUserLoading(false);
                setUser(data.data.data);
            })
            .catch((err) => {
                setUserLoading(false);
                console.error(err);
            });
    };

    const getUsersData = () => {
        instance
            .get("api/socks/factory/user")
            .then((data) => {
                setUsersData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getRoleData = () => {
        instance
            .get("api/socks/factory/role")
            .then((data) => {
                setRoleData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getMeasurementData = () => {
        instance
            .get("api/socks/factory/measurement/getAll")
            .then((data) => {
                setMeasurementData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getCategoryData = () => {
        instance
            .get("api/socks/factory/category/getAll")
            .then((data) => {
                setCategoryData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getClientData = () => {
        instance
            .get("api/socks/factory/client/getAll")
            .then((data) => {
                setClientData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getSocksData = () => {
        instance
            .get("api/socks/factory/socks/list")
            .then((data) => {
                setSocksData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getMaterialData = () => {
        instance
            .get("api/socks/factory/api/socks/factory/material/getAll")
            .then((data) => {
                setMaterialData(data.data.data);
            })
            .catch((err) => console.error(err));
    };

    const getOutcomeSocksData = () => {
        instance
            .get("api/socks/factory/outcome/list")
            .then((data) => {
                const filtered = data.data.data.filter((item) => {
                    if (item.debt === true) {
                        return item;
                    }
                });
                setOutcomeSocksData(filtered);
            })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getUserData(token);
        getMaterialData();
        getMeasurementData();
        getCategoryData();
        getSocksData();
        getRoleData();
        getClientData();
        getOutcomeSocksData();
        getUsersData();
    }, []);

    let formData = {};

    switch (location.pathname) {
        case "/others": {
            formData = {
                formData: othersData,
                editFormData: othersData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/income-dryfruit": {
            formData = {
                formData: othersData,
                editFormData: othersData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "O'zgartirish",
                modalTitle: "Yangi qo'shish",
            };
            break;
        }
        case "/socks": {
            formData = {
                formData: createSocksData,
                editFormData: editsocksData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: false,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Quruq mevanini o'zgartirish",
                modalTitle: "Quruq meva qo'shish",
            };
            break;
        }
        case "/material": {
            formData = {
                formData: materialData,
                editFormData: editmaterialData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Quruq mevanini o'zgartirish",
                modalTitle: "Quruq meva qo'shish",
            };
            break;
        }
        case "/income-socks": {
            formData = {
                formData: incomeSocksData,
                editFormData: editIncomeSocksData,
                branchData: false,
                timeFilterInfo: true,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: true,
                editModalTitle: "Kelgan naskini o'zgartirish",
                modalTitle: "Kelgan naskini qo'shish",
            };
            break;
        }
        case "/clients": {
            formData = {
                formData: clientsData,
                editFormData: clientsData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Klientni o'zgartirish",
                modalTitle: "Yangi klient qo'shish",
            };
            break;
        }
        case "/debts": {
            formData = {
                formData: outdebtFormData,
                editFormData: editOutdebtFormData,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Tashqi qarzni o'zgartirish",
                modalTitle: "Tashqi qarz qo'shish",
            };
            break;
        }
        case "/users": {
            formData = {
                formData: usersDataForm,
                editFormData: editUsersDataForm,
                branchData: false,
                timeFilterInfo: false,
                deleteInfo: true,
                createInfo: true,
                editInfo: true,
                timelyInfo: false,
                editModalTitle: "Foydalanuvchini o'zgartirish",
                modalTitle: "Yangi foydalanuvchi qo'shish",
            };
            break;
        }
        case "/outcome-socks": {
            formData = {
                formData: outcomeSocksData,
                editFormData: editOutcomeSocksData,
                branchData: false,
                timeFilterInfo: true,
                deleteInfo: false,
                createInfo: true,
                editInfo: true,
                timelyInfo: true,
                editModalTitle: "Sotilgan naskini o'zgartirish",
                modalTitle: "Sotilgan naskini qo'shish",
            };
            break;
        }
        default: {
            formData = { ...formData };
        }
    }

    const value = {
        formData,
        getMeasurementData,
        getOutcomeSocksData,
        measurementData,
        getCategoryData,
        getMaterialData,
        getUserData,
        getUsersData,
        getSocksData,
        getClientData,
        categoryData,
        user,
        userLoading,
        usersdata,
        roleData,
        setUsersData,
        createMaterialData,
        socksData,
        clientData,
        outcomeSocksIdData,
    };

    return (
        <DataContext.Provider value={value}>{children}</DataContext.Provider>
    );
};
