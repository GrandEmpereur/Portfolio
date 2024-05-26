import React from 'react';
import { Locale } from '@/i18nConfig';
import { getDictionary } from '@/get-dictionary';
import NavBarClient from '@/components/clients/NavBarClient';

type NavBarServerProps = {
    params: { lang: Locale };
};

const NavBarServer: React.FC<NavBarServerProps> = async ({ params }) => {
    const dictionary = await getDictionary(params.lang);
    return <NavBarClient lang={params.lang} dictionary={dictionary} />;
};

export default NavBarServer;
