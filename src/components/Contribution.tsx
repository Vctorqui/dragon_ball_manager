import { Box, Button, Container, Link, styled } from '@mui/material'

const ContributionSection = styled(Box)(() => ({
  textAlign: 'center',
  backgroundColor: '#022',
  padding: '2rem',
  borderRadius: '0.5rem',
  border: '1px solid #000',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
  '.contribute-title': { fontSize: '1.5rem', fontWeight: 600 },
  '.contribute-text': { color: '#f1f1f1', marginTop: '1rem' },
  '.contribute-buttons': {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginTop: '1rem',
  },
}))

const Contribution = () => {
  return (
    <section style={{ background: '#000' }}>
      <Container maxWidth={'lg'}>
        <ContributionSection>
          <h2 className='text-2xl font-semibold'>Want to contribute?</h2>
          <p className='text-muted-foreground'>
            Register now to add new characters or edit existing ones!
          </p>
          <div className='flex justify-center gap-4'>
            <Button>
              <Link href='/auth/register'>Register Now</Link>
            </Button>
            <Button variant='outlined'>
              <Link href='/auth/login'>Login</Link>
            </Button>
          </div>
        </ContributionSection>
      </Container>
    </section>
  )
}

export default Contribution
