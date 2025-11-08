import Routers from "../routes/Routers";

const Layout = () => {
    return (
        <>
            <h1>Header</h1>
            <main className="min-h-[60vh] w-[100%] bg-[#f1f3f6]">
                <Routers />
            </main>
            <h2>Footer</h2>
        </>
    );
};

export default Layout;
