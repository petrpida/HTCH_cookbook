import { render, screen } from "@testing-library/react";
import App from "../App";

const testApp = {
    name: "Test App"
}


test ('should render Confirmation', () => {
    // render of component, which is tested
    render(<App app={testApp}/>)

    // get element according to test ID
    const element = screen.getByTestId("title")

    // method, which is expecting element is being on the page.
    expect(element).toBeInTheDocument()
})