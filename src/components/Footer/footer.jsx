const Footer = () => {
    return(
        <div className="w-[100%] bg-gray-100 flex justify-center">
            <div className="md:p-3 w-[100%] flex flex-col items-center py-4">
                <div className="flex gap-0 items-center cursor-pointer">
                    <h3 className="text-blue-800 font-bold text-xl">Linked</h3>
                    <img src={'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/960px-LinkedIn_logo_initials.png'} alt="LInkedInLogo" className="w-4 h-4 ml-[2px]" />
                </div>
                <div className="text-sm">@Copyright 2025</div>
            </div>
        </div>
    )
}

export default Footer;