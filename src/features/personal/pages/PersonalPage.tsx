import PersonalTopBar from "../components/PersonalTopBar";
import PersonalSidebar from "../components/PersonalSidebar";
import PersonalTable from "../components/PersonalTable";
import { usePersonalData } from "../hooks/usePersonalData";
import Footer from "../../dashboard/components/Footer";


const PersonalPage = () => {
    const { data, loading } = usePersonalData();
    return (

        <div className="flex h-full">
            {/* Sidebar izquierdo */}
            <PersonalSidebar />

            {/* Contenido principal */}
            <div className="flex-1 p-6 flex flex-col">

                {/* Botones horizontales */}
                <PersonalTopBar />

                {/* Tabla */}
                <div className="overflow-x-auto flex-1">
                    <PersonalTable data={data} loading={loading} />
                </div>

                {/* Footer */}
                <div className="mt-6">
                    <Footer />
                </div>

            </div>
        </div>
    );
};

export default PersonalPage;
