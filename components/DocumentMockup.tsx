'use client'

import Image from 'next/image'

export default function DocumentMockup() {
    return (
        <div className="relative w-full max-w-[480px] aspect-[4/3] perspective-1000">
            {/* Background slide */}
            <div className="absolute top-[10%] right-[10%] w-[85%] aspect-[16/10] bg-white rounded shadow-lg border border-gray-100 rotate-3 translate-x-4">
                <div className="w-full h-full p-4 flex flex-col gap-2">
                    <div className="w-1/2 h-4 bg-gray-100 rounded"></div>
                    <div className="w-full h-2 bg-gray-50 rounded"></div>
                    <div className="w-2/3 h-2 bg-gray-50 rounded"></div>
                    <div className="flex-grow bg-gray-50/50 rounded flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border-2 border-dashed border-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Middle slide */}
            <div className="absolute top-[5%] right-[5%] w-[85%] aspect-[16/10] bg-white rounded shadow-xl border border-gray-100 -rotate-2 -translate-x-2">
                <div className="w-full h-full p-4 flex flex-col gap-2">
                    <div className="w-1/3 h-4 bg-accent-50 rounded"></div>
                    <div className="flex gap-4 h-24">
                        <div className="flex-grow bg-gray-100 rounded"></div>
                        <div className="flex-grow bg-gray-100 rounded"></div>
                    </div>
                    <div className="w-full h-2 bg-gray-50 rounded"></div>
                </div>
            </div>

            {/* Front slide */}
            <div className="absolute top-0 right-0 w-[85%] aspect-[16/10] bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden ring-1 ring-black/5">
                <div className="h-full flex flex-col">
                    {/* Cover Header */}
                    <div className="h-2 bg-accent-500 w-full"></div>
                    <div className="p-6 flex flex-col h-full bg-gradient-to-br from-white to-gray-50">
                        <div className="text-[10px] font-bold text-accent-600 uppercase tracking-widest mb-2">
                            SERVICE INTRODUCTION
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-primary-900 leading-tight mb-4">
                            SkyFuture AI Lab<br />
                            <span className="text-accent-600">サービス紹介資料</span>
                        </h3>

                        <div className="flex-grow flex items-center justify-center p-4">
                            {/* Visual icon or logo emblem */}
                            <div className="relative w-24 h-24">
                                <div className="absolute inset-0 bg-accent-500/10 rounded-full animate-pulse"></div>
                                <div className="absolute inset-4 bg-accent-500 rounded-full flex items-center justify-center shadow-lg">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto border-t border-gray-100 pt-4 flex items-center justify-between">
                            <span className="text-[10px] text-gray-400 font-medium">© SkyFuture AI Lab</span>
                            <div className="flex gap-1">
                                <div className="w-3 h-1 bg-accent-500 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
