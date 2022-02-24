import { getIconComponentByName } from '../../utils/icons-map';
import Button from '../Button';

export default function Sigmanauts() {
    return (
        <div className="max-w-[1300px] mx-auto p-4 flex flex-col md:flex-row md:mt-44">
            <div className='flex justify-end mb-10 md:w-1/3 md:mt-auto md:mb-auto 2xl:justify-around'>{getIconComponentByName('Sigmanauts')}</div>
            <div className='md:ml-20 md:w-2/3'>
                <h1 className='mb-6 md:hidden'>Sigmanauts</h1>
                <h2 className='mb-6 hidden md:block'><b>Sigmanauts</b></h2>
                <p className='font-subtitle-1 mb-6 md:text-[56px]'>Ambassador programme</p>
                <p className='text-[#989898] dark:text-[#989898] mb-6'>There is a rich budding ecosystem budding ontop of Ergo. Whether you are a developer, miner, or investor - we’ve got you covered.</p>
                <div className="-ml-4"><Button text="SIGMANAUTS ONBOARDING" url='/url' newTab={true} underline={true} textColor="brand-orange" background={false} icon='ArrowRight' iconColor='orange' /></div>
            </div>
        </div>
    );
}