import DataTable from "../components/DataTable";

const CustomersPage = () => {
  return (
    <div>
      <h1 className=" flex justify-center p-3 font-bold text-2xl text-gray-700">
        Customer Data
      </h1>
      <DataTable />
    </div>
  );
};

export default CustomersPage;
