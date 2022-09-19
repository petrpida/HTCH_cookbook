import {OverlayTrigger, Popover} from "react-bootstrap";
import Button from "react-bootstrap/Button";

function Confirmation({title, message, confirmText, onConfirm, children}) {
    const handleConfirm = () => {
        if (typeof onConfirm === "function") {
            onConfirm();
            handleClose()
        }
    }

    const handleClose = () => document.body.click();

    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">{title}</Popover.Header>
            <Popover.Body>
                {message}
                <div className='d-flex flex-column gap-2 mt-3 w-100'>
                    <Button
                        variant='danger'
                        onClick={handleConfirm}
                    >
                        {confirmText}
                    </Button>
                    <Button
                        variant='light'
                        onClick={handleClose}
                    >
                        Zrušit
                    </Button>
                </div>
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger
                trigger="click"
                placement="bottom"
                overlay={popover}
                rootClose
            >
                {children}
            </OverlayTrigger>
        </>
    );
}

export default Confirmation