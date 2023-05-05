Feature: Message Board API

  Scenario: posts message to anon board
    When I POST a message to "/api/messages"
      | name  | anon1            |
      | body  | Some message     |
      | title | My first message |
    Then I make a GET against "/api/messages"
      """
        [
          {
            "title": "My first message",
            "name": "anon1",
            "body": "Some message"
          }
        ]
      """