import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

const DocumentPreview = ({ url }) => {
  const [fileType, setFileType] = useState(null);
  const [error, setError] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfError, setPdfError] = useState(false);
  
  useEffect(() => {
    const determineFileType = (url) => {
      const extension = url?.split('.').pop().toLowerCase();
      if (extension === 'pdf') {
        return 'pdf';
      } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) {
        return 'image';
      }
      return null;
    };

    setIsLoading(true);
    setPdfError(false);
    setError(null);
    setFileType(determineFileType(url));
  }, [url]);

  const handleDownload = () => {
    window.open(url, '_blank');
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handlePdfLoad = () => {
    setIsLoading(false);
  };

  const handlePdfError = () => {
    setPdfError(true);
    setIsLoading(false);
  };

  if (error) {
    return (
      <Alert variant="danger">
        Error loading document: {error}
      </Alert>
    );
  }

  const renderPdfViewer = () => {
    if (pdfError) {
      return (
        <Alert variant="warning" className="m-3">
          Unable to preview PDF directly. 
          <Button 
            variant="link" 
            onClick={handleDownload}
            className="p-0 ms-2"
          >
            Click here to open in a new tab
          </Button>
        </Alert>
      );
    }

    return (
      <>
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '600px' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        )}
        <div 
          style={{
            minHeight: '600px',
            transform: `scale(${zoom})`,
            transformOrigin: 'top left',
            transition: 'transform 0.2s ease',
            display: isLoading ? 'none' : 'block'
          }}
        >
          <object
            data={url}
            type="application/pdf"
            style={{ width: '100%', height: '600px' }}
          >
            <iframe
              src={`${url}#toolbar=0`}
              style={{ width: '100%', height: '600px', border: 'none' }}
              title="PDF Preview"
              onLoad={handlePdfLoad}
              onError={handlePdfError}
            />
          </object>
        </div>
      </>
    );
  };

  return (
    <Card className="w-100" style={{ maxWidth: '1200px' }}>
      <Card.Body>
        <Container fluid>
          {/* Control Bar */}
          <Row className="mb-4 align-items-center">
            <Col xs={12} md={4} className="d-flex align-items-center mb-3 mb-md-0">
              <span className="fs-4 me-2">
                {fileType === 'pdf' ? '📄' : '🖼️'}
              </span>
              <span className="fw-bold">
                {fileType === 'pdf' ? 'PDF' : 'Image'}
              </span>
            </Col>
            
            <Col xs={12} md={8}>
              <div className="d-flex justify-content-md-end align-items-center gap-2">
                {/* Zoom Controls */}
                <div className="d-flex align-items-center">
                  <Button 
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.5 || isLoading}
                    variant="outline-secondary"
                    size="sm"
                  >
                    -
                  </Button>
                  <span className="mx-2">{Math.round(zoom * 100)}%</span>
                  <Button 
                    onClick={handleZoomIn}
                    disabled={zoom >= 3 || isLoading}
                    variant="outline-secondary"
                    size="sm"
                  >
                    +
                  </Button>
                  <Button 
                    onClick={handleResetZoom}
                    variant="outline-secondary"
                    size="sm"
                    className="ms-2"
                    disabled={isLoading}
                  >
                    Reset
                  </Button>
                </div>
                
                {/* Download Button */}
                <Button
                  onClick={handleDownload}
                  variant="outline-primary"
                  size="sm"
                  className="ms-3"
                >
                  Open
                </Button>
              </div>
            </Col>
          </Row>

          {/* Preview Container */}
          <Row>
            <Col>
              <div className="border rounded overflow-auto">
                {fileType === 'pdf' ? (
                  renderPdfViewer()
                ) : fileType === 'image' ? (
                  <div 
                    className="text-center"
                    style={{
                      transform: `scale(${zoom})`,
                      transformOrigin: 'center top',
                      transition: 'transform 0.2s ease'
                    }}
                  >
                    {isLoading && (
                      <div className="d-flex justify-content-center align-items-center" style={{ height: '400px' }}>
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      </div>
                    )}
                    <img
                      src={url}
                      alt="Document Preview"
                      className="img-fluid"
                      style={{ display: isLoading ? 'none' : 'block' }}
                      onLoad={() => setIsLoading(false)}
                      onError={(e) => {
                        setError('Failed to load image');
                        setIsLoading(false);
                      }}
                    />
                  </div>
                ) : (
                  <Alert variant="warning">
                    Unsupported file type
                  </Alert>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default DocumentPreview;