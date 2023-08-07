'use client';
import { observer } from "mobx-react-lite";
import React from "react";
import Lightbox from "yet-another-react-lightbox";
import { Thumbnails, Video } from "yet-another-react-lightbox/plugins";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import "yet-another-react-lightbox/styles.css";

import './index.scss';

type PropsType = {
    items: { type: string, src: string }[],
    isOpened: boolean,
    onClose: () => void,
    index?: number
}

export const UiLightbox = observer(({ items, isOpened, onClose, index = 0 }: PropsType) => {
    return (
        <div className="ui-lightbox">
            <Lightbox
                plugins={[Video, Thumbnails]}
                open={isOpened}
                close={onClose}
                index={index}
                slides={items.map(item => {
                    if (item.type === 'video') {
                        return {
                            type: 'video',
                            sources: [{
                                src: item.src,
                                autoPlay: true,
                                type: "video/mp4",
                            }]
                        };
                    }
                    return { src: item.src };
                })}
            />
        </div>
    )
})
