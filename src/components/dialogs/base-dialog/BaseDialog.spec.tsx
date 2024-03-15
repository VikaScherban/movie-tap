import {render, fireEvent, screen} from '@testing-library/react';
import BaseDialog from './BaseDialog';

describe('BaseDialog', () => {
  it('should render the dialog component with title and children', () => {
    const title = 'Test Dialog';
    const content = 'Dialog Content';
    const onCloseMock = jest.fn();

    render(
        <BaseDialog title={title} onClose={onCloseMock}>
          {content}
        </BaseDialog>
    );

    const dialog = screen.getByTestId('dialog');
    const dialogTitle = screen.getByText(title);
    const dialogCloseButton = screen.getByTestId('dialog-close-button');
    const dialogContent = screen.getByText(content);

    expect(dialog).toBeInTheDocument();
    expect(dialogTitle).toBeInTheDocument();
    expect(dialogCloseButton).toBeInTheDocument();
    expect(dialogContent).toBeInTheDocument();
  });

  it('should call onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();

    render(
        <BaseDialog title="Test Dialog" onClose={onCloseMock}>
          Dialog Content
        </BaseDialog>
    );

    const dialogCloseButton = screen.getByTestId('dialog-close-button');
    fireEvent.click(dialogCloseButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
