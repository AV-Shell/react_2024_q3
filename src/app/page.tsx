import { ThemeContextProvider } from '@/context/theme.context';
import dynamic from 'next/dynamic';

const PersonsPage = dynamic(() => import('@/components/persons-page/persons-page'), { ssr: false });

export default function Home() {
  return (
    <ThemeContextProvider>
      <PersonsPage />
    </ThemeContextProvider>
  );
}
