import styled from 'styled-components';

const Root = styled.div`
  max-width: 800px;
  margin: 64px auto;
`

const AboutContainer = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AboutHead = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(12, 34, 56, 0.2);
  padding: 20px;
  font-size: 24px;
`

const AboutBody = styled.div``

export default function AboutPage() {
  return (
    <Root>
      <AboutContainer>
        <AboutHead>關於我</AboutHead>
        <AboutBody>
          大家好，歡迎來到我的部落格
        </AboutBody>
      </AboutContainer>
    </Root>
  )
}