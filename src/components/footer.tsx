export function Footer() {
    return (
        <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 flex flex-row items-center justify-center gap-4 text-left">
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#55D78E] to-[#1EA6BD]">
                    TKS
                </h1>
                <span className="text-gray-400">© {new Date().getFullYear()} Thiago Suzuki</span>
            </div>
        </footer>
    )
}