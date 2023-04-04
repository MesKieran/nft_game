import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start  text-muted' >
      <section className='d-flex justify-content-center justify-content-lg-between p-1 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                TreesTogether
              </h6>
              <p>
                This is a blockchain porject that helps to increase awareness of carbon footprint using blockchain as a tool.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Technology</h6>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Blockchain
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  NFT
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Carbon Credits
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='https://github.com/MesKieran/nft_game' className='text-reset'>
                  Github
                </a>
              </p>
              <p>
                <a href='https://stepn.com/' className='text-reset'>
                  Inspiration
                </a>
              </p>
              <p>
                <a href='https://ethereum.org/en/whitepaper/' className='text-reset'>
                  Etherium White Paper
                </a>
              </p>
              <p>
                <a href='https://ethereum.org/en/developers/docs/standards/tokens/erc-721/' className='text-reset'>
                  NFT (ERC721)
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Singapore, Nanyang Technological University, School Of EEE
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                wuxiangyihui@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> + 65 90050685
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> + 65 90050685
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2023 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Wu Xiangjiekang
        </a>
      </div>
    </MDBFooter>
  );
}