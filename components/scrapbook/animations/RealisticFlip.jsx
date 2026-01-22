'use client';
import React, { forwardRef, useRef, useEffect, useState, useImperativeHandle } from 'react';
import HTMLFlipBook from 'react-pageflip';

const Page = forwardRef((props, ref) => {
    return (
        <div className="demoPage" ref={ref} data-density={props.density || 'soft'}>
            <div 
                className={`w-full h-full overflow-hidden ${props.styleConfig?.rounded}`}
                style={{ backgroundColor: props.bgColor || '#FFFDF5' }}
            >
                {props.children}
                {/* Shadow Gradient for depth */}
                {props.side === 'right' && (
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
                )}
                {props.side === 'left' && (
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                )}
            </div>
        </div>
    );
});
Page.displayName = 'Page';

export default function RealisticFlip({ 
    pages, // Raw pages array
    currentSheetIndex, // Controlled by parent
    onIndexChange, // To update parent
    bgColor,
    renderPage,
    styleConfig = { border: '', shadow: 'shadow-2xl', rounded: 'rounded-sm' }
}) {
    const book = useRef();
    const [sortedPages, setSortedPages] = useState([]);

    // Reconstruct page order to match BookPreview logic
    // Order: [FrontCover(0), Inner(2), Inner(3), ..., BackCover(1)]
    useEffect(() => {
        if (!pages || pages.length < 2) return;
        
        const newOrder = [];
        
        // 1. Front Cover
        const frontCover = { ...pages[0], pageType: 'cover-front', density: 'hard' };
        newOrder.push(frontCover);

        // 2. Inner Pages (start from index 2)
        // Note: react-pageflip expects pages in reading order:
        // Page 0 (Cover - Right), Page 1 (Left), Page 2 (Right), etc.
        // Our BookPreview logic: Cover(0) -> Flip -> Back(2) -> Next(3)...
        // So the order in the book is: 0, 2, 3, 4, ...
        
        for (let i = 2; i < pages.length; i++) {
            newOrder.push({ ...pages[i], pageType: 'inner' });
        }

        // 3. Back Cover (index 1)
        const backCover = { ...pages[1], pageType: 'cover-back', density: 'hard' };
        newOrder.push(backCover);

        // Ensure even number of pages for proper closure if needed?
        // HTMLFlipBook handles odd pages by leaving last one empty or we can add blank.
        // But let's stick to this list.
        setSortedPages(newOrder);

    }, [pages]);

    // Sync Parent State -> Book
    useEffect(() => {
        if (!book.current) return;
        
        // currentSheetIndex corresponds to spreads.
        // 0 = Cover (Page 0)
        // 1 = Spread 1 (Pages 1 & 2)
        // 2 = Spread 2 (Pages 3 & 4)
        // ...
        
        // React-pageflip uses single page indices.
        // If sheetIndex = 0, target page = 0.
        // If sheetIndex = 1, target page = 1 (or 2?).
        // Usually FlipBook shows 2 pages.
        // If I want Spread 1 (pages 1-2 visible), I should flip to page 1.
        
        const targetPageIndex = currentSheetIndex === 0 ? 0 : (currentSheetIndex * 2 - 1);
        
        try {
            // Only flip if significant difference to avoid loop
            // current sheet 1 => page 1.
            const currentFlipPage = book.current.pageFlip().getCurrentPageIndex();
            
            // Check if we are already showing this spread
            // e.g. spread 1 shows page 1 and 2. currentFlipPage could be 1 or 2.
            const isShowingTarget = (targetPageIndex === currentFlipPage) || (targetPageIndex === currentFlipPage - 1);
            
            // Allow flipping if cover (0)
            if (currentSheetIndex === 0 && currentFlipPage !== 0) {
                 book.current.pageFlip().flip(0);
                 return;
            }

            if (!isShowingTarget && currentSheetIndex > 0) {
                book.current.pageFlip().flip(targetPageIndex);
            }
        } catch (e) {
            // Ignore init errors
        }

    }, [currentSheetIndex]);


    const onFlip = (e) => {
        // e.data is the new page index (top left page usually, or just the current visible index)
        const newPageIndex = e.data;
        
        let newSheetIndex = 0;
        if (newPageIndex === 0) {
            newSheetIndex = 0;
        } else {
            // Page 1 or 2 => Sheet 1.
            // Page 3 or 4 => Sheet 2.
            newSheetIndex = Math.ceil(newPageIndex / 2);
        }
        
        // Update parent if different
        if (newSheetIndex !== currentSheetIndex) {
            onIndexChange && onIndexChange(newSheetIndex);
        }
    };

    // Dimensions
    const PAGE_WIDTH = 500;
    const PAGE_HEIGHT = 700;

    if (sortedPages.length === 0) return null;

    return (
        <div className={`relative flex items-center justify-center ${styleConfig.shadow} transition-color duration-300`}>
             <HTMLFlipBook
                width={PAGE_WIDTH}
                height={PAGE_HEIGHT}
                size="fixed"
                minWidth={300}
                maxWidth={1000}
                minHeight={400}
                maxHeight={1533}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                usePortrait={false}
                className="mx-auto"
                ref={book}
                onFlip={onFlip}
                clickEventForward={true}
                useMouseEvents={true}
             >
                {sortedPages.map((page, index) => {
                    // Determine visual side (odd/even)
                    // In array: 0=Right(Cover), 1=Left, 2=Right, 3=Left...
                    // Wait, ShowCover=true logic:
                    // Page 0: Right (Cover)
                    // Page 1: Left
                    // Page 2: Right
                    
                    // So Index 0 is Right.
                    // Index 1 is Left.
                    // Index 2 is Right.
                    // ...
                    const side = (index === 0) ? 'right' : (index % 2 !== 0 ? 'left' : 'right');
                    return (
                        <Page 
                            key={page.id || index} 
                            number={index} 
                            bgColor={bgColor} 
                            side={side}
                            styleConfig={styleConfig}
                            density={page.density}
                        >
                            {renderPage(page, side)}
                        </Page>
                    );
                })}
             </HTMLFlipBook>
        </div>
    );
}
