import Routers from "../routes/Routers";

const Layout = () => {
    return (
        <>
            <main className="min-h-[60vh] w-[100%] bg-[#f1f3f6]">
                <Routers />
            </main>
        </>
    );
};

export default Layout;
