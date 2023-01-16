import { observer } from "mobx-react";

import { UiIcon, UiSlider } from "shared/uikit";

import './index.scss';

type PropsType = {
    items: string[]
}

export const PStoreSlider = observer(({ items }: PropsType) => {
    return (
        <div className="p-store-slider">
            <UiSlider
                loop
                items={items}
                renderItem={(image) => (
                    <div
                        key={image}
                        className='p-store-slider-item'
                        style={{ backgroundImage: `url(${image})` }}
                    />
                )}
                renderNavigation={(navigation) => (
                    <>
                        <div className="p-store-slider__prev" onClick={() => navigation.prev()}>
                            <UiIcon size={15} name={'chevronLeft'}/>
                        </div>
                        <div className="p-store-slider__next" onClick={() => navigation.next()}>
                            <UiIcon size={15} name={'chevronRight'}/>
                        </div>
                        <div className="p-store-slider__dots">
                            {navigation.dots('p-store-slider__dot')}
                        </div>
                    </>
                )}
            />
        </div>
    )
});
