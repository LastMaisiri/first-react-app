import { useEffect, useState } from 'react';

const useScrollSpy = (sectionIds: string[]) => {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    const handleScroll = () => {
        const scrollPosition = window.scrollY;

        sectionIds.forEach((sectionId) => {
            const section = document.getElementById(sectionId);
            if (section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(sectionId);
                }
            }
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [sectionIds]);

    return activeSection;
};

export default useScrollSpy;