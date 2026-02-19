const Header = ({title, subtitle}) => {
    return(
        <div className="flex flex-col">
            <h1 className="font-bold text-3xl">{title}</h1>
            <div className="text-gray-500">{subtitle}</div>
        </div>
    )
}

export default Header;