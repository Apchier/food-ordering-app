import { AccountLayout } from '@/components/layout/AccountLayout';
import { CreateStoreForm } from '@/features/store/components/form/CreateStoreForm';
import Head from 'next/head';

export const SettingCreateStorePage = () => {
    return (
        <>
            <Head>
                <title>Setting - Create Store</title>
            </Head>
            <CreateStoreForm />
        </>
    );
};

SettingCreateStorePage.getLayout = (page: React.ReactElement) => (
    <AccountLayout>{page}</AccountLayout>
);