## Explain this Pull Request 🙏

- Jira URL: https://9git-9git.atlassian.net/browse/SCRUM-108

## What has fixed? 🛠

<details> <summary><strong>📝 메모 추가 팝업 기능 구현 내용</strong></summary>
- 메모 추가 시 표시되는 팝업 화면을 제작하였습니다.
- 코드 리뷰를 반영하여 react-hook-form을 사용해 직접적인 상태 관리를 제거하고, 폼 상태를 효율적으로 관리하였습니다.
- 기획팀의 제안에 따라 메모 입력창은 두 줄 높이로 설정하고, 최대 30자까지 입력 가능하도록 제한하였습니다.
- 메모는 필수 입력값으로 유효성 검사를 적용하였으며, 아무것도 입력하지 않고 완료를 누를 시 에러 메세지가 표시됩니다.
- 개인적으로 사용자가 글자 수를 실시간으로 확인할 수 있으면 좋을 것 같다고 판단해 작성 중인 글자 수를 표기하도록 하였습니다.

## Whether needed review 🖍

<!-- 마크다운의 빈 체크박스 문법은 [ ] / 채워진 체크박스 문법은 [x] 입니다. -->

- [x] 🙋🏻 리뷰가 필요합니다!
- [ ] 🙅🏻 리뷰가 필요하지 않습니다!

(이유 : 메모 팝업 기능 구현 코드 확인 )

## Document🗒️ (Optional)

## Screenshot 📸 (Optional)

![alt text](<화면 캡처 2025-04-09 234525.png>)

## Test Checklist ✅ (Optional)

<!-- 마크다운의 빈 체크박스 문법은 [ ] / 채워진 체크박스 문법은 [x] 입니다. -->
