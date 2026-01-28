import Image from 'next/image'
import Breadcrumb from '@/components/Breadcrumb'

interface SectionHeroProps {
    title: string
    description?: string
    bgImage?: string
    breadcrumbs?: { label: string; href?: string }[]
}

export default function SectionHero({
    title,
    description,
    bgImage,
    breadcrumbs,
}: SectionHeroProps) {
    return (
        <section className="relative h-[35vh] min-h-[350px] md:h-[45vh] md:min-h-[400px] w-full overflow-hidden bg-gray-950 text-white">
            {/* 背景图片 */}
            {bgImage ? (
                <>
                    <Image
                        src={bgImage}
                        alt={title}
                        fill
                        className="object-cover opacity-50"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/70 to-transparent" />
                </>
            ) : (
                <>
                    {/* 默认渐変背景 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-[#1A213E]" />
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-20" />
                </>
            )}

            <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary-600/10 blur-[100px]" />

            <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-6 max-w-7xl pt-12 md:pt-0">
                {breadcrumbs && (
                    <div className="mb-4 md:mb-6">
                        <Breadcrumb items={breadcrumbs} light />
                    </div>
                )}

                <div className="max-w-4xl animate-in fade-in slide-in-from-left-8 duration-700">
                    <h1 className="mb-4 text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl border-l-4 border-primary-500 pl-4 md:pl-6 leading-[1.2]">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-base text-gray-200 leading-relaxed md:text-2xl font-medium max-w-2xl">
                            {description}
                        </p>
                    )}
                </div>
            </div>

            {/* 底部装饰线 */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
        </section>
    )
}
