import { useEffect, useState } from "react";
import styled from "styled-components";

import { Observable } from "windowed-observable";

interface ObservableMessage {
  target: string;
  action: string;
  value?: any;
}

const Wrapper = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  margin: 20px;
`;

const observable = new Observable("mfe-observable");

const App = () => {
  const [count, setCount] = useState(0);
  const [app2Count, setApp2Count] = useState(0);
  const [messageFromContainer, setMessageFromContainer] = useState<
    string | null
  >(null);
  const handleObservableMessage = (
    message: ObservableMessage,
    app2Count: number
  ) => {
    if (message.target !== "app1") return;

    switch (message.action) {
      case "increment":
        setApp2Count(app2Count + 1);
        break;
      case "container_message":
        console.log("receiving");
        setMessageFromContainer(message.value);
        break;
    }
  };

  useEffect(() => {
    observable.subscribe((e) => handleObservableMessage(e, app2Count));

    return () => {
      observable.unsubscribe((e) => handleObservableMessage(e, app2Count));
    };
  }, [app2Count]);

  const incrementCount = () => {
    setCount(count + 1);
    observable.publish({ action: "increment", target: "app2" });
  };

  return (
    <Wrapper>
      This is the 'app 1' microfrontend.
      <button onClick={() => incrementCount()}>
        You've clicked this button {count} time{count === 1 ? "" : "s"}.
      </button>
      <p>
        App 2 has been clicked {app2Count} time{app2Count === 1 ? "" : "s"}.
      </p>
      {messageFromContainer && (
        <p>
          Message from Container: <em>{messageFromContainer}</em>
        </p>
      )}
    </Wrapper>
  );
};

export default App;
