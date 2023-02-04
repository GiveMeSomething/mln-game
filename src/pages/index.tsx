import { Inter } from '@next/font/google';

import staticChipData from '@/data/static-chip.json';
import movableChipData from '@/data/movable-chip.json';

import { DraggableChipContainer } from '@/components/layout/DraggableChipContainer';
import { ChipContainer } from '@/components/layout/ChipContainer';
import { Header } from '@/components/layout/Header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto w-full">
        <Header />

        <div className="grid grid-cols-3 gap-8 mt-5">
          <div className="col-span-2">
            <h1 className="text-2xl font-bold text-center">
              Xây dựng và bảo vệ đất nước
            </h1>
            {/* Chip Container for static chips, each have their own drop zone */}
            <div className="mt-5">
              <ChipContainer chips={staticChipData} />
            </div>
          </div>

          <div className="col-span-1">
            <h1 className="text-2xl font-bold text-center">
              Các tác nhân chống phá
            </h1>
            {/* Drop zone, store draggable chips */}
            <div className="border h-full mt-5">
              <DraggableChipContainer chips={movableChipData} />
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
