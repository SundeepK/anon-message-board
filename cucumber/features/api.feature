Feature: Message Board API

  Scenario: posts message to anon board
    When I POST a message to "/messages"
      | name  | anon1            |
      | body  | Some message     |
      | title | My first message |
    Then I make a GET against "/messages"
      """
        [
          {
            "title": "My first message",
            "name": "anon1",
            "body": "Some message"
          }
        ]
      """