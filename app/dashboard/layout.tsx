import Navigation from "@/components/Navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            
                <Navigation />
                <div className="p-8">
                    {children}
                </div>
                

        </div>
    );
}