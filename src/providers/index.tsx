import { QueryProvider } from './query-provider'
// import { ThemeProvider } from './theme-provider'


export const Providers = ({ children }: { children: React.ReactNode }) => {
    
    return(<>
        <QueryProvider>
                 {children}
        </QueryProvider>
    </>
    );
}