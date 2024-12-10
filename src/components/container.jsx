export const Container = ({ children }) => {
    return (
        <div className="flex h-screen items-center border border-gray-300 overflow-y-hidden max-w-[375px] mx-auto">{children}</div>
    )
}