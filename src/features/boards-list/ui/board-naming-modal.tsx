import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/kit/dialog';
import { useBoardNamingModal } from '../model/use-board-naming-modal';
import { Button } from '@/shared/ui/kit/button';
import { useCreateBoard } from '../model/use-create-board';
import { BoardNamingInput } from './board-naming-input';
import { useBoardNaming } from '../model/use-board-naming';
import { useApplyTemplate } from "@/features/boards-list";

export function BoardNamingModal() {
    const {
        isOpen,
        close,
        template,
        setTemplate,
    } = useBoardNamingModal();
    const createBoard = useCreateBoard();
    const boardNaming = useBoardNaming();
    const { applyTemplate } = useApplyTemplate();

    return (
        <Dialog
            open={isOpen}
            onOpenChange={close}
        >
            <DialogContent
                className="max-w-[calc(100%-4rem)]"
            >
                <DialogHeader>
                    <DialogTitle>
                        Board creation
                    </DialogTitle>
                    <DialogDescription>
                        Give your board a name to get started
                    </DialogDescription>
                </DialogHeader>
                <BoardNamingInput
                    value={boardNaming.name}
                    onChange={boardNaming.setName}
                />
                <Button
                    className="flex-1"
                    disabled={createBoard.isPending}
                    onClick={
                        () => {
                            if (template) {
                                applyTemplate(
                                    boardNaming.name,
                                    template.name,
                                );
                                setTemplate(null);
                            } else {
                                createBoard.createBoard(
                                    boardNaming.name,
                                );
                            }
                            close();
                        }
                    }
                >
                    Create board
                </Button>
            </DialogContent>
        </Dialog>
    )
}